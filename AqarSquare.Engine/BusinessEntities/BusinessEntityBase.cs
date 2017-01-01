using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;

namespace AqarSquare.Engine.BusinessEntities
{
    /// <summary>
    /// Class that acts the base for all business entities
    /// </summary>
    [DataContract()]
    [Serializable]
    public class BusinessEntityBase
    {
        public HeaderData Header { get; set; }

        public BusinessEntityBase()
        {
            Header = new HeaderData()
            {
                AppVersion = string.Empty,
                CurrentDevice = Devices.Android,
                CurrentLanguage = Languages.English,
                UserToken = string.Empty
            };
        }

        public BusinessEntityBase(HeaderData header)
        {
            Header = header;
        }

        #region public methods
        /// <summary>
        /// Fills the database entity.
        /// </summary>
        /// <typeparam name="entityType">The type of the ntity type.</typeparam>
        /// <param name="entity">The entity.</param>
        public void FillDBEntity<entityType>(ref entityType entity)
        {
            List<PropertyInfo> entityProperties = typeof(entityType).GetProperties().ToList();
            List<PropertyInfo> thisProperties = this.GetType().GetProperties().ToList();
            foreach (PropertyInfo property in entityProperties)
            {
                PropertyInfo myProperty = thisProperties.Find(item => item.Name == property.Name);
                if (myProperty != null)
                {
                    property.SetValue(entity, myProperty.GetValue(this, null), null);
                }
            }
        }
        /// <summary>
        /// Add properties values from additional data entity other than the original one.
        /// It overrides any property exists in both the original class and the input one.
        /// </summary>
        /// <typeparam name="entityType">The type of the ntity type.</typeparam>
        /// <param name="entity">The input entity.</param>
        public void AddValuesFromEntity<entityType>(entityType entity)
        {
            string entityName = typeof(entityType).Name;
            Convert<entityType>(entity, entityName + "_");
        }
        /// <summary>
        /// Adds the values from anonymous object.
        /// </summary>
        /// <param name="anonymous">The anonymous.</param>
        public void AddValuesFromAnonymousObject(object anonymous)
        {
            List<PropertyInfo> anonymousProperties = anonymous.GetType().GetProperties().ToList();
            List<PropertyInfo> thisProperties = this.GetType().GetProperties().ToList();
            foreach (PropertyInfo property in thisProperties)
            {
                PropertyInfo anonymousProperty = anonymousProperties.Find(item => item.Name == property.Name);
                if (anonymousProperty != null)
                {
                    property.SetValue(this, anonymousProperty.GetValue(anonymous, null), null);
                }
            }
        }
        
        /// <summary>
        /// Converts the specified entity from a DB entity.
        /// </summary>
        /// <typeparam name="entityType">The type of the DB entity type.</typeparam>
        /// <param name="entity">The DB entity.</param>
        public void Convert<entityType>(entityType entity)
        {
            Convert<entityType>(entity, string.Empty);
        }
        /// <summary>
        /// Converts the specified entity from a DB entity.
        /// </summary>
        /// <typeparam name="entityType">The type of the DB entity type.</typeparam>
        /// <param name="entity">The DB entity.</param>
        /// <param name="prefix">a prefix to use when matching properties.</param>
        public void Convert<entityType>(entityType entity, string prefix)
        {
            prefix = prefix.Replace("Entity", string.Empty);
            List<PropertyInfo> entityProperties = typeof(entityType).GetProperties().ToList();
            List<PropertyInfo> thisProperties = this.GetType().GetProperties().ToList();
            foreach (PropertyInfo property in thisProperties)
            {
                if (string.IsNullOrEmpty(prefix) || property.Name.StartsWith(prefix))
                {
                    string targetPropertyName = property.Name;
                    if (!string.IsNullOrEmpty(prefix))
                        targetPropertyName = targetPropertyName.Remove(0, prefix.Length);
                    PropertyInfo entityProperty = entityProperties.Find(item => item.Name == targetPropertyName);
                    if (entityProperty != null)
                    {
                        property.SetValue(this, entityProperty.GetValue(entity, null), null);
                    }
                }
            }
        }
        #endregion

        #region private and protected methods
        /// <summary>
        /// Adds the list from entity.
        /// </summary>
        /// <typeparam name="entityType">The type of the ntity type.</typeparam>
        /// <typeparam name="entityBusinessType">The type of the ntity business type.</typeparam>
        /// <param name="entities">The entities.</param>
        /// <returns></returns>
        protected List<entityBusinessType> GetListFromEntityBusinessType<entityType, entityBusinessType>(List<entityType> entities)
        {
            List<entityBusinessType> result = new List<entityBusinessType>();
            foreach (entityType entity in entities)
            {
                entityBusinessType item = (entityBusinessType)Assembly.GetCallingAssembly().CreateInstance(typeof(entityBusinessType).FullName,
                    false, BindingFlags.CreateInstance, null, new object[] { entity }, null, null);
                result.Add(item);
            }
            return result;
        }
        #endregion
    }
}
